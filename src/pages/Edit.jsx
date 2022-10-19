import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonInput,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Style.css";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useAuth } from "../contexts/AuthContext";

export default function Create() {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [author, setAuthor] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { currentSong } = useAuth();
  const [post, setPost] = useState({
    Title: "default title",
    Number: "default subtitle",
    Lyrics: "lorem ibsum",
  });

  useIonViewWillEnter(() => {
    setTitle(currentSong.Title);
    setLyrics(currentSong.Lyrics);
    setAuthor(currentSong.Author);
    console.log(currentSong);
  }, [currentSong]);

  useEffect(() => {
    if (initializing === false) {
      console.log(post);
      handleCreate();
    }
  }, [post]);

  //A toggle used to prevent other useEffect functions from running on the first render. This should always be the last useEffect.
  useEffect(() => {
    setInitializing(false);
  }, []);

  async function handleCreate() {
    setSubmitting(true);
    await setDoc(doc(db, "Lyrics", currentSong.id), {
      Title: post.Title,
      Lyrics: post.Lyrics,
      Author: post.Author,
    });
    setSubmitting(false);
  }

  function loadPost() {
    setPost({
      Title: title,
      Author: author,
      Lyrics: editorRef.current.getContent(),
    });
  }

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Create</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard className="createForm">
          <IonTitle className="createTitle">Insert new lyrics</IonTitle>
          <IonLabel className="createLabel">Title:</IonLabel>
          <IonInput
            type="text"
            id="title"
            className="createInput"
            value={title}
            onIonChange={(e) => setTitle(e.target.value)}
          ></IonInput>
          <IonLabel className="createLabel">Lyrics:</IonLabel>
          <div className="createEditor">
            <Editor
              tinymceScriptSrc={
                process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
              }
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
            className="createInput"
            value={author}
            onIonChange={(e) => setAuthor(e.target.value)}
          ></IonInput>
          <IonButton onClick={loadPost}>
            {submitting ? "Updating.." : "Update"}
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
