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
} from "@ionic/react";
import "./Style.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function Create() {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    Title: "default title",
    Number: "default subtitle",
    Lyrics: "lorem ibsum",
  });

  useEffect(() => {
    if (initializing === false) {
      console.log(post);
      handleCreate("createPost");
    }
  });

  //A toggle used to prevent other useEffect functions from running on the first render. This should always be the last useEffect.
  useEffect(() => {
    setInitializing(false);
  }, []);

  async function handleCreate() {
    setSubmitting(true);
    const docRef = collection(db, "Lyrics");

    await addDoc(docRef, {
      Title: post.Title,
      Author: post.Author,
      Lyrics: post.Lyrics,
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
            placeholder="Title"
            onIonChange={(e) => setTitle(e.target.value)}
          ></IonInput>
          <IonLabel className="createLabel">Lyrics:</IonLabel>
          <div className="createEditor">
            <Editor
              tinymceScriptSrc={
                process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
              }
              onInit={(evt, editor) => (editorRef.current = editor)}
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
            placeholder="Author"
            onIonChange={(e) => setAuthor(e.target.value)}
          ></IonInput>
          <IonButton onClick={loadPost}>
            {submitting ? "Creating.." : "Create lyrics"}
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
