import sha1 from 'sha1';

export default function ScriptElement(props) {

    const scriptContentHash = sha1(props.content + props.element.src);
    const doesAlreadyExist = document.getElementById(scriptContentHash);
    if (!doesAlreadyExist) {
        const script = document.createElement("script");
        script.id = scriptContentHash;
        script.innerHTML = unescapeString(props.content);
        document.body.appendChild(script);
    }

    return (null);
}

function unescapeString(content) {
    content = content.replace(/&gt;/g, '>');
    content = content.replace(/=</g, '=>');
    return content;
}
