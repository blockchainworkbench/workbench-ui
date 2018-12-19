import React from 'react';
import {Link} from "react-router-dom";

class PageContent extends React.Component {

    render() {
        if (this.props.page) {
            return (
                <div>
                    <h1 className="title has-text-centered">{this.props.page.title}</h1>
                    <div className="content">
                        {this.props.page.content ? <p>TODO: load content</p>
                            : <p className='icon loading has-text-info'><i className='fas fa-spinner fa-spin'/></p>}
                        <div className='level'>
                            <div className='level-left'>
                                &lt;&lt; <Link to='/pages/introduction/transactions'>Transactions</Link> (previous)
                            </div>
                            <div className='level-left'>
                                (next) <Link to='/pages/introduction/mempool'>Mempool</Link> &gt;&gt;
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div>
                <h1 className="title has-text-centered">loading..</h1>
                <p className='icon loading has-text-info'><i className='fas fa-spinner fa-spin'/></p>
            </div>)
        }
        return null;
    }
}

export default PageContent;