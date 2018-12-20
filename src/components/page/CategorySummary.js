import React from 'react';
import {Link} from "react-router-dom";

class CategorySummary extends React.Component {

    render() {
        return (
            <div>
                <h1 className="title has-text-centered">Summary for {this.props.categoryTitle}</h1>
                <div className="content">
                    <p>Nulla imperdiet, odio sit amet hendrerit egestas, mauris lacus pretium mauris, mattis malesuada
                        eros purus at neque. Nunc et bibendum neque, sed mattis ante. Vivamus bibendum elit lorem, vitae
                        condimentum nunc congue vel. Morbi interdum interdum dui, eget dictum lacus commodo a. Maecenas
                        et pharetra dui. Nullam bibendum, elit tristique dictum posuere, tortor diam faucibus nisl, sit
                        amet mattis magna quam non diam. Pellentesque cursus tellus eget felis fringilla rutrum. Nulla
                        ac blandit enim, at commodo massa. Etiam congue rhoncus justo, id bibendum est vestibulum
                        et.</p>

                    <p>Sed vitae nulla arcu. Quisque bibendum arcu sed metus varius tincidunt. In condimentum ex sed
                        felis placerat mattis. Etiam at augue ut ligula hendrerit facilisis. Nulla nibh nunc,
                        sollicitudin sed porta id, eleifend eget leo. Aliquam elementum velit sed tellus viverra
                        bibendum. Mauris a vulputate lectus. Nullam nec feugiat ipsum, quis pretium massa. Sed erat
                        tortor, tempus congue justo ultricies, mollis scelerisque urna. Ut laoreet, lorem eu dapibus
                        aliquam, neque metus interdum ante, ac aliquet lorem massa eu diam. Curabitur quis nibh sit amet
                        sem condimentum tempus sit amet ut ligula. Suspendisse a risus imperdiet, eleifend leo ac,
                        venenatis risus. Aliquam erat volutpat. Etiam dapibus dolor congue laoreet pellentesque. In
                        auctor tortor nunc, non porta diam interdum eu.</p>

                    <p>Nunc facilisis, nisl ac egestas elementum, lacus nunc laoreet nunc, eget mollis ligula turpis in
                        justo. Praesent justo urna, ultricies a blandit ac, vestibulum commodo sapien. Pellentesque
                        habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin felis
                        nisl, vulputate eu interdum quis, bibendum vitae erat. Etiam rutrum lacinia sapien, vel
                        tincidunt lorem varius at. Duis nunc nulla, cursus iaculis varius a, scelerisque vel lectus.
                        Donec auctor tempor sapien, eu aliquet nisi finibus ac. </p>
                    <div className='level'>
                        <div className='level-left'/>
                        <div className='level-right has-text-right'>
                            <Link to='/#advanced' className='button is-info is-large'>Next Chapter</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategorySummary;