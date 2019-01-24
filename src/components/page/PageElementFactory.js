import React from 'react';

import ExerciseElement from "./elements/ExerciseElement";
import CodeElement from "./elements/CodeElement";
import UnknownElement from "./elements/UnknownElement";
import QuoteElement from "./elements/QuoteElement";
import {H1Element, H2Element} from "./elements/HeaderElement";
import ParagraphElement from "./elements/ParagraphElement";

export default class PageElementFactory {
    static createElement(element, idx) {
        switch (element.type) {
            case "h1":
                return <H1Element key={idx} content={element.content}/>;
            case "h2":
                return <H2Element key={idx} content={element.content}/>;
            case "p":
                return <ParagraphElement key={idx} content={element.content}/>;
            case "exercise":
                return <ExerciseElement key={idx} id={idx} content={element.content}/>;
            case "code":
                return <CodeElement key={idx} id={idx} content={element.content}/>;
            case "quote":
                return <QuoteElement key={idx} content={element.content}/>;
            default:
                return <UnknownElement key={idx} type={element.type}/>;
        }
    }
}