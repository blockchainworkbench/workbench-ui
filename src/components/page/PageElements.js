import ExerciseElement from "./elements/ExerciseElement";
import CodeElement from "./elements/CodeElement";
import UnknownElement from "./elements/UnknownElement";
import QuoteElement from "./elements/QuoteElement";
import ParagraphElement from "./elements/ParagraphElement";
import LinkElement from "./elements/LinkElement";
import YoutubeElement from "./elements/YoutubeElement";
import HTMLElement from "./elements/HTMLElement";
import HeaderElement from "./elements/HeaderElement";
import ScriptElement from "./elements/ScriptElement";
import ImageElement from "./elements/ImageElement";
import EmphasisElement from "./elements/EmphasisElement";
import DivElement from "./elements/DivElement";
import ButtonElement from "./elements/ButtonElement";
import StyleElement from "./elements/StyleElement";
import ListElement from "./elements/ListElement";

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
    "quote": QuoteElement,
    "exercise": ExerciseElement,
    "img": ImageElement,
    "em": EmphasisElement,
    "div": DivElement,
    "button": ButtonElement,
    "style": StyleElement,
    "ul": ListElement,
    "unknown": UnknownElement
};
