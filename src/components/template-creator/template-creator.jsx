import { useEffect, useRef, useState, useContext } from "react";
import { Button, Card, FormControl, TextField} from "@mui/material";
import { Save } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext, admins, addTemplate, templateTypes } from '../app/app';
import { isNumber, template } from "lodash";


export function TemplateCreator() {
  const user = useContext(UserContext);
  const editorRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [name, setName] = useState("תבנית חדשה");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  let templateType = searchParams.get('templateType');  
  const [templateTypeNumber, setTemplateTypeNumber] = useState();

  if (!user || !admins.includes(user.email)) {
      navigate("/login");
  }

  if(!templateTypeNumber) {
    if(isNaN(templateType)) {
      navigate("/settings");
    } else {
      let num =Number(templateType);
      console.log(num);
      setTemplateTypeNumber(num);
    }

    if( !Object.values(templateTypes).includes(templateTypeNumber)) {
      navigate("/settings");
    }
  }
  
  useEffect(() => {
    const textarea = editorRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);


  const handleSave = () => {
    addTemplate(templateTypeNumber, name, description, content)
    navigate("/settings");
  }


  return (
    <div className="flex flex-col full-height full-width">
      <header className="flex justify-end items-end">
        <div className="flex items-center">
          <Button size="sm" variant="ghost" onClick={handleSave}>
            <Save/>
            שמור
          </Button>
        </div>
      </header>
        <div className="flex-wrap flex full-height">
        <div className="min-width-20-percent min-200-px bg-white pad-left flex flex-col pad-bottom flex-size-min-300">
            <FormControl className="pad-top">
              <TextField
                fullWidth
                label="שם התבנית"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                placeholder="התחל לכתוב כאן את תוכן התבנית..."
              />
            </div>
          </Card>
          </div>
      </div>
      </div>
  );
};