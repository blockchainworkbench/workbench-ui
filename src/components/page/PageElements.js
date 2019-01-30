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
    "js": ScriptElement,
    "code": CodeElement,
    "quote": QuoteElement,
    "exercise": ExerciseElement,
    "unknown": UnknownElement
};