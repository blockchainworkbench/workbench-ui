import React from 'react';
import ContentArray from "../ContentArray";

export default function TableElement(props) {
    return <table>{props.content.map((item, idx) => {
        if (item.type === 'thead') {
            return <TableHead key={idx} content={item.content}/>;
        } else if (item.type === 'tbody') {
            return <TableBody key={idx} content={item.content}/>;
        } else {
            return <TableRow key={idx} content={item.content}/>;
        }
    })}</table>;
}

function TableHead(props) {
    return <thead>{props.content.map((element, idx) => <TableRow key={idx} content={element.content}/>)}</thead>;
}

function TableBody(props) {
    return <tbody>{props.content.map((element, idx) => <TableRow key={idx} content={element.content}/>)}</tbody>;
}

function TableRow(props) {
    return <tr>{props.content.map((element, idx) => <TableCell key={idx} type={element.type} content={element.content}/>)}</tr>;
}

function TableCell(props) {
    if (props.type === "td") {
        return <td><ContentArray content={props.content}/></td>;
    } else if (props.type === "th") {
        return <th><ContentArray content={props.content}/></th>;
    } else {
        const msg = `Unsupported TabelCell type ${props.type}`;
        console.log(msg);
        return <td>{msg}</td>;
    }
}
