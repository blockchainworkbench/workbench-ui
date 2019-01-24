import ExerciseElement from "./elements/ExerciseElement";
import CodeElement from "./elements/CodeElement";
import UnknownElement from "./elements/UnknownElement";
import QuoteElement from "./elements/QuoteElement";
import ParagraphElement from "./elements/ParagraphElement";
import LinkElement from "./elements/LinkElement";
import YoutubeElement from "./elements/YoutubeElement";
import HTMLElement from "./elements/HTMLElement";

export default {
    "h1": {"type": "h1", "className": "title is-2"},
    "h2": {"type": "h2", "className": "subtitle is-4"},
    "h3": {"type": "h3", "className": "subtitle is-5"},
    "h4": {"type": "h4", "className": "subtitle is-6"},
    "h5": {"type": "h5", "className": "subtitle is-6"},
    "h6": {"type": "h6", "className": "subtitle is-6"},
    "p": {"type": ParagraphElement},
    "a": {"type": LinkElement},
    "youtube": {"type": YoutubeElement},
    "html": {"type": HTMLElement},
    "code": {"type": CodeElement},
    "quote": {"type": QuoteElement},
    "exercise": {"type": ExerciseElement},
    "unknown": {"type": UnknownElement}
};