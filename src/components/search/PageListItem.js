import React from 'react';
import PropTypes from 'prop-types';
import {urlify, getDifficultyColorForTag} from "../../lib/helpers";
import {connect} from 'react-redux';
import {selectPage} from '../../actions';
import {Link} from 'react-router-dom';

class PageListItem extends React.Component {
    render() {
        const diffTileClass = `tag is-pulled-right ${getDifficultyColorForTag(this.props.page.difficulty)}`;
        return (
            <div className='tile is-parent is-4 catLink'
                 onClick={() => this.handleClickElement(this.props.page.url)}>
                <div className='tile is-child box'>
                    <Link
                        to={`/pages/${urlify(this.props.page.categories[0])}/${urlify(this.props.page.title)}`}>
                        <p>
                            <span className="title is-4">
                                {this.props.page ? this.props.page.title : 'Page undefined'}
                            </span>
                            {this.props.page.difficulty
                                ? <span className={diffTileClass}>{this.props.page.difficulty}</span>
                                : null}
                        </p>
                        <p className='content'>{this.props.page.description}</p>
                        <p className="content tags">
                            {this.props.page.categories.map((t, idx) =>
                                <span key={idx} className='tag catItem is-info'>{t}</span>)}
                        </p>
                    </Link>
                </div>
            </div>
        )
    }

    handleClickElement(pageId) {
        this.props.selectPage(pageId);
    }
}

PageListItem.propTypes = {
    topic: PropTypes.object
};

const mapDispatchToProps = dispatch => {
    return {
        selectPage: pageId => dispatch(selectPage(pageId))
    };
};

const ConnectedPageListItem = connect(null, mapDispatchToProps)(PageListItem);
export default ConnectedPageListItem;