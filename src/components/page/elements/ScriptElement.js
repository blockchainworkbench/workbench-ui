export default function ScriptElement(props) {
    const script = document.createElement("script");
    script.innerHTML = props.content;
    // TODO : Only append to body if script hasn't been added in the past
    document.body.appendChild(script);
    return (null);
}