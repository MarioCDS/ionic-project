import {
  IonButton,
  IonCard,
  IonInput,
  IonLabel,
  IonTitle,
  IonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { Editor } from "@tinymce/tinymce-react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase-config";
import "../pages/Style.css";

export default function LyricsForm({ mode }) {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { currentSong, currentUser } = useAuth();
  const [showCreateToast, setShowCreateToast] = useState(false);
  const [post, setPost] = useState({
    Title: "",
    Number: "",
    Lyrics: "",
  });
  const historyUse = useHistory();

  useIonViewWillEnter(() => {
    if (!currentUser) {
      historyUse.push("/index");
    }
  }, [currentUser]);

  useIonViewWillEnter(() => {
    if (mode === "edit") {
      setTitle(currentSong.Title);
      setLyrics(currentSong.Lyrics);
      setAuthor(currentSong.Author);
      if (currentSong.CreatedBy !== currentUser.uid) {
        historyUse.push("/index");
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (initializing === false && mode === "create") {
      handleCreate();
    } else if (initializing === false && mode === "edit") {
      handleEdit();
    }
  }, [post]);

  //A toggle used to prevent other useEffect functions from running on the first render. This should always be the last useEffect.
  useEffect(() => {
    setInitializing(false);
  }, [post]);

  //reset the form and return to the index page.
  function resetForm() {
    setTitle("");
    setAuthor("");
    setLyrics("");
    editorRef.current.setContent("");
    setShowCreateToast(true);
    historyUse.replace("/index");
  }
  async function handleCreate() {
    setSubmitting(true);

    //Create the new Firestore document and send it to the database.
    try {
      const docRef = collection(db, "Lyrics");
      await addDoc(docRef, {
        Title: post.Title,
        Author: post.Author,
        Lyrics: post.Lyrics,
        CreatedBy: currentUser.uid,
      });
    } catch (error) {
      console.log(error);
    }

    resetForm();
    setSubmitting(false);
  }

  //Pushes the changes to the current song to the Firestore database.
  async function handleEdit() {
    setSubmitting(true);
    try {
      await setDoc(doc(db, "Lyrics", currentSong.id), {
        Title: post.Title,
        Lyrics: post.Lyrics,
        Author: post.Author,
        CreatedBy: currentUser.uid,
      });
    } catch (error) {
      console.log(error);
    }

    resetForm();
    setSubmitting(false);
  }

  function handleBack() {
    historyUse.replace("/index");
  }

  function loadPost() {
    if (title.length > 0) {
      if (author.length > 0) {
        if (editorRef.current.getContent().length > 0) {
          setPost({
            Title: title,
            Author: author,
            Lyrics: editorRef.current.getContent(),
          });
        } else {
          alert("Please enter lyrics");
        }
      } else {
        alert("Please enter an author");
      }
    } else {
      alert("Please enter a title");
    }
  }

  return (
    <IonCard className="createForm">
      <IonTitle className="createTitle">Insert new lyrics</IonTitle>
      <IonLabel className="createLabel">Title:</IonLabel>
      <IonInput
        type="text"
        id="title"
        className="createInput"
        value={title}
        placeholder="Title"
        onIonChange={(e) => setTitle(e.target.value)}
      ></IonInput>
      <IonLabel className="createLabel">Lyrics:</IonLabel>
      <div className="createEditor">
        <Editor
          tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={lyrics}
          init={{
            height: 500,

            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "preview",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
      <IonLabel className="createLabel">Author:</IonLabel>
      <IonInput
        type="text"
        id="author"
        value={author}
        className="createInput"
        placeholder="Author"
        onIonChange={(e) => setAuthor(e.target.value)}
      ></IonInput>
      <IonButton onClick={loadPost}>
        {mode === "create"
          ? submitting
            ? "Creating.."
            : "Create lyrics"
          : submitting
          ? "Updating.."
          : "Update lyrics"}
      </IonButton>
      <IonButton style={{ margin: "0 10px" }} onClick={handleBack}>
        Back
      </IonButton>
      <IonToast
        isOpen={showCreateToast}
        onDidDismiss={() => setShowCreateToast(false)}
        message={
          mode === "create" ? "Song succesfully created!" : "Song updated!"
        }
        duration={1000}
      />
    </IonCard>
  );
}
