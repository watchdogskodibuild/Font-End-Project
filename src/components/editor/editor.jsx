import { useEffect, useRef, useState, useContext } from "react";
import { Button, Input, Tab, Tabs, Box, Card, InputLabel, FormControl, TextField, duration} from "@mui/material";
import { Save, Download, Share2, MoreHorizontal } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AutoSaveContext, getDocument, getTemplateById, updateDocument } from "../app/app";
import { addDocumentsForUser } from "../app/app";
import { UserContext } from '../app/app';

export function Editor() {
  const autoSave = useContext(AutoSaveContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState("עבודה חדשה");
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [documentId, setDocumentId] = useState(null);
  let templateId = searchParams.get('template');

  let docId = searchParams.get('documentId');
//   // Load template content when component mounts

  useEffect(() => {
    if (templateId) {
        getTemplateById(templateId).then(template => {
          if (template.exists()) {
            setTitle(template.data().name);
            setContent(template.data().content);
          }
        }   
        );
        
    }
  }, [templateId]);



  
  useEffect(() => {
    if (docId && user) {
        getDocument(docId).then(document => {
          if(document.exists()) {
            setDocumentId(docId);
            setTitle(document.data().title);
            setDescription(document.data().description);
            setContent(document.data().content);
          } else {
            setDocumentId(null);
          }
        });
       };
  }, [docId, user]);
  
  useEffect(() => {
    const textarea = editorRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleSave = () => {
      if(documentId) {
        updateDocument(content, title, description, documentId);
      } else {
        addDocumentsForUser(content, title, description, templateId, user);
      }
    }

  useEffect(() => {
      if(autoSave)
      {
        const interval = setInterval(() => {
          if(documentId) {
            console.log(documentId);
            updateDocument(content, title, description, documentId);
          } else {
            addDocumentsForUser(content, title, description, templateId, user).then(document => {
              setDocumentId(document.id);
            });
          }
        }, 30000);
       return () => {
        clearInterval(interval);
        };
      }

  }, [autoSave, title, description, content, documentId])


  return (
    <div className="flex flex-col full-height full-width">
      {/* Header */}
      <header className="flex justify-end items-end">
        <div className="flex items-center">
          <Button size="sm" variant="ghost" onClick={handleSave}>
            <Save/>
            שמור
          </Button>
          <Button size="sm" variant="ghost" onClick={handleDownload}>
            <Download/>
            הורד
          </Button>
        </div>
      </header>

        {/* Left sidebar - Tools */}
        <div className="flex-wrap flex full-height">
        <div className="min-width-20-percent min-200-px bg-white pad-left flex flex-col pad-bottom flex-size-min-300">
            <FormControl className="pad-top">
              <TextField
                fullWidth
                label="כותרת"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl className="pad-top">
              <TextField
                fullWidth
                label="תיאור"
                multiline
                minRows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
        </div>
        
        {/* Main content - Editor */}
        <div className="width-80-percent mx-auto max-w-4xl full-height editor-container min-300-px flex-size-min-300">
          <Card className="full-width full-height">
            <div className="lined-paper min-h-full pad-8">
              <textarea
                ref={editorRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="full-width full-height bg-transparent outline-none text-sm border-none resize-none"
                placeholder="התחל לכתוב כאן..."
              />
            </div>
          </Card>
          </div>
      </div>
      </div>
  );
};