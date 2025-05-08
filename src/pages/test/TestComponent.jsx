import {useEffect, useState} from 'react';
function TestComponent({content}) {
    //const [myContent, setMyContent] = useState(content);
    const myContent = content;
    
    const formatContent = (content) => {
        return `Status: ${content.state}`;
    }
    
    return (
        <>
            <h1>Test Component</h1>
            <h2>{formatContent(myContent)}</h2>
        </>
    );
}

export default TestComponent;
