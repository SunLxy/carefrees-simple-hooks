import ReactDOM from 'react-dom/client';
import { SimplePreview } from "simple-markdown-preview"
import "./index.css"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <SimplePreview path={() => import("@carefrees/simple-hooks/README.md")} />,
);
