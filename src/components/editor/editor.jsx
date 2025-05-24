import { useEffect, useRef, useState, useContext } from "react";
import { Button, Input, Tab, Tabs, Box, Card} from "@mui/material";
import { Save, Download, Share2, MoreHorizontal } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getDocument, getDocumentsForUser, getTemplate, updateDocument } from "../app/app";
import { addDocumentsForUser } from "../app/app";
import { UserContext } from '../app/app';
import { isNil } from "lodash";

export function Editor() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState("עבודה חדשה");
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  let templateId = searchParams.get('template');
  let documentId = searchParams.get('documentId');
  
//   // Load template content when component mounts
  useEffect(() => {
    if (templateId) {
        templateId = parseInt(templateId);
        const template = getTemplate(templateId);
        if (template) {
            setTitle(template.name);
            setContent(template.content);
        }
    }
  }, [templateId]);
  
  useEffect(() => {
    if (documentId && user) {
        getDocument(documentId).then(document => {
          if(document.exists()) {
            setTitle("עריכת קובץ קיים");
            setContent(document.data().content);
          } else {
            documentId = null;
          }
        });
       };
  }, [documentId, user]);
  
  // Auto-grow textarea
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

//   function TabPanel({ value, index, children }) {
//   return (
//     value === index && (
//       <Box sx={{ p: 2 }}>
//         <Typography>{children}</Typography>
//       </Box>
//     )
//   );
// }

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
        updateDocument(content, documentId);
      } else {
        addDocumentsForUser(content, templateId, user);
      }
    }

  return (
    <div className="flex flex-col full-height full-width">
      {/* Header */}
      <header className="bg-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
          </Link>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-bold text-xl border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-8"
          />
        </div>
        
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
      
      <div className="flex flex-1 overflow-hidden full-height full-width">
        {/* Left sidebar - Tools */}
        <div className="width-20-percent bg-white overflow-y-auto">
        </div>
        
        {/* Main content - Editor */}
          <Card className="width-80-percent mx-auto max-w-4xl full-height editor-container">
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
  );
};