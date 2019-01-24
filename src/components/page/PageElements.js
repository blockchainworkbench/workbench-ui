import ExerciseElement from "./elements/ExerciseElement";
import CodeElement from "./elements/CodeElement";
import UnknownElement from "./elements/UnknownElement";
import QuoteElement from "./elements/QuoteElement";
import ParagraphElement from "./elements/ParagraphElement";

export default {
    "h1": {"type": "h1", "className": "title is-2"},
    "h2": {"type": "h2", "className": "subtitle is-4"},
    "h3": {"type": "h3", "className": "subtitle is-5"},
    "h4": {"type": "h4", "className": "subtitle is-6"},
    "h5": {"type": "h5", "className": "subtitle is-6"},
    "h6": {"type": "h6", "className": "subtitle is-6"},
    "p": {"type": ParagraphElement},
    "code": {"type": CodeElement},
    "quote": {"type": QuoteElement},
    "exercise": {"type": ExerciseElement},
    "unknown": {"type": UnknownElement}
};