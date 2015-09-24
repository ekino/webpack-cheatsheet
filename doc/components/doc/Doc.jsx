/**
 * Created by Pebie on 22/09/15.
 */

import React, { Component } from 'react';
import DocHelper from '../../helpers/DocHelper.js';
import $ from 'jquery';


export default class Doc extends Component {


    clean(texts) {

        if (!texts) {
            return "";

        }
        console.log( texts);
        return texts.join("\n");
    }

    componentDidMount() {
        let doc = document.getElementById('doc');
        let k = 0;
        let comments = {};
        let currentComments = [];
        let state = "INIT";

        $("div.line").each((i, line)=> {

            console.log(state, $(line).text());
            let isComment = $("span.comment", line).length > 0;

            if (isComment) {
                if (state !== "COMMENT") {
                    state = "COMMENT";
                    k++;
                }

                currentComments.push($(line).text());

                $(line).addClass('commentLine');

            } else {
                // not comment anymore
                if (state === "COMMENT") {

                    comments[k] = currentComments;
                    $(line).attr("comment", this.clean(comments[k]));

                    state = "CODE"
                    currentComments = [];
                } else {
                    $(line).attr("comment", this.clean(comments[k]));
                }
            }
        });
    }

    createMarkup() {
        return { __html: DocHelper.getDocHtml() };
    }

    render() {
        return (
            <div className="doc" dangerouslySetInnerHTML={this.createMarkup()}>

            </div>
        );
    }
}
