/**
* Created by Pebie on 22/09/15.
*/
import '../../styles/monokai.less';
import '../../styles/doc.scss';

import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import DocHelper from '../../helpers/DocHelper.js';
import DocText from './DocText.jsx';
import $ from 'jquery';

export default class Doc extends Component {
    constructor(props) {
        super(props);
        this.state = {currentDoc:''}
    }

    componentDidMount() {
        let doc = document.getElementById('doc');

        $("pre > .line").each((i,line) => {

            let isComment = $("span.comment", line).length > 0;
            if(isComment){
                $(line).addClass("is-comment");
            }else{
                $(line).addClass("is-code");
            }
        });

        $("pre > .line").each((i,line) => {
            let wrap =  $(line).nextUntil('.is-code');
            $(wrap).wrapAll("<div class='comment-block'></div>");
        });

        $("pre > .comment-block").each((i,line) => {
            $(line).attr('data-doc-id',i);
            $(line).addClass('comment-block-toggle',i);
            $(line).next().attr('data-doc-id',i);
            $(line).next().addClass('pointer');
            $(line).next().bind('click',this, this.handleClick);
            $(line).next().bind('mouseover',this, this.handleMouseover);
            $(line).next().bind('mouseout',this, this.handlerMouseout);
            this.props.model[i]  = this.clean($(line).text());
        });
    }

    clean(text){
        let pattern = "//";
        let re = new RegExp(pattern, "g");
        let filter = text.replace(re,"");
        filter = $.trim(filter);
        return filter;
    }

    handleMouseover(e){
        let _this = e.data;
        let $currentTarget = $(e.currentTarget);
        $currentTarget.addClass('over');
        let id = $currentTarget.attr('data-doc-id');
        _this.setState({
            currentDoc : _this.props.model[id]
        });
    }

    handlerMouseout(e){
        let _this = e.data;
        let $currentTarget = $(e.currentTarget);
        $currentTarget.removeClass('over');
    }

    handleClick(e){

        $(".comment-block-toggle").each((i,line)=>{
            $(line).removeClass('comment-block-toggle--visible');
        });

        let _this = e.data;
        let $currentTarget = $(e.currentTarget);
        let id = $currentTarget.attr('data-doc-id');
        $currentTarget.prevUntil('.is-code').toggleClass('comment-block-toggle--visible')
    }

    createMarkup() {
        return { __html: DocHelper.getDocHtml() };
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid container-fluid">
                    <Col xs={10} md={8}>
                        <div dangerouslySetInnerHTML={this.createMarkup()}>

                        </div>
                    </Col>
                    <Col xs={6} md={4}>
                        <DocText currentDoc={ this.state.currentDoc }/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
Doc.propTypes = {
    model: PropTypes.object,
};
Doc.defaultProps = { model: {} };
