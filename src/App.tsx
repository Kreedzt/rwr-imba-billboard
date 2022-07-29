import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mdContent from './mdLogs/2022-07-30.md?raw';
import './normalize.css';
import './markdown.less';
import './App.less';

const defaultContent = mdContent;

function App() {
    const editorDOMRef = useRef<HTMLDivElement>(null);

    const [markdownContent, setMarkdownContent] =
        useState<string>(defaultContent);

    const exportToFile = useCallback(() => {
        if (!editorDOMRef.current) return;

        html2canvas(editorDOMRef.current, {
            scale: 4,
            useCORS: true,
            allowTaint: true,
        }).then((cavas) => {
            const image = new Image();
            image.src = cavas.toDataURL('image/png', 1.0);
            document.body.appendChild(image);
        });
    }, []);

    const plugins = useMemo(() => {
        return [remarkGfm];
    }, [remarkGfm]);

    return (
        <>
            <div className="app">
                <div className="wrapper">
                    <div className="main-container">
                        <div className="content-wrapper">
                            <button onClick={exportToFile}>导出</button>
                            <div className="content-section" ref={editorDOMRef}>
                                <ReactMarkdown
                                    children={markdownContent}
                                    remarkPlugins={plugins}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overlay-app"></div>
            </div>
        </>
    );
}

export default App;
