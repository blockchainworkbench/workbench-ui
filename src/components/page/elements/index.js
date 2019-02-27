import ExerciseElement from "./ExerciseElement";
import CodeBlockElement from "./CodeBlockElement";
import UnknownElement from "./UnknownElement";
import QuoteElement from "./QuoteElement";
import ParagraphElement from "./ParagraphElement";
import LinkElement from "./LinkElement";
import YoutubeElement from "./YoutubeElement";
import HTMLElement from "./HTMLElement";
import HeaderElement from "./HeaderElement";
import ScriptElement from "./ScriptElement";
import ImageElement from "./ImageElement";
import EmphasisElement from "./EmphasisElement";
import DivElement from "./DivElement";
import ButtonElement from "./ButtonElement";
import StyleElement from "./StyleElement";
import ListElement from "./ListElement";
import StrongElement from "./StrongElement";
import CodeElement from "./CodeElement";

export default {
    "h1": HeaderElement,
    "h2": HeaderElement,
    "h3": HeaderElement,
    "h4": HeaderElement,
    "h5": HeaderElement,
    "h6": HeaderElement,
    "p": ParagraphElement,
    "a": LinkElement,
    "youtube": YoutubeElement,
    "html": HTMLElement,
    "script": ScriptElement,
    "code": CodeElement,
    "codeblock": CodeBlockElement,
    "blockquote": QuoteElement,
    "exercise": ExerciseElement,
    "img": ImageElement,
    "em": EmphasisElement,
    "div": DivElement,
    "button": ButtonElement,
    "style": StyleElement,
    "ul": ListElement,
    "strong": StrongElement,
    "unknown": UnknownElement
};
