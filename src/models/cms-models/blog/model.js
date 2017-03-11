'use strict';
const
    _ =require('lodash'),
    uuid = require('uuid'),
    Media = require('./../media/model'),
    Author = require('./../author/model'),
    BaseModel = require('./../base-model/model');

const defaultBlogPost = {
    title: '',
    shortText: '',
    fullText: '',
    date: '',
    banner: '',
    author: '',
    description: '',
    url: null,
    category: 'others'
};

class BlogPost extends BaseModel {

    constructor(blogPost) {
        super(blogPost);

        if(blogPost && blogPost.fields){
            let {fields} = blogPost;
            this.title = fields.title || '';
            this.shortText = fields.shortText || '';
            this.fullText = fields.fullText || '';
            this.date = fields.date && new Date(fields.date);
            this.banner = new Media(_.get(fields, 'banner', null));
            this.author = new Author(_.get(fields, 'author', null));
            this.description = fields.title.description;
            this.url = _.get(fields, 'file.url', null);
            this.category = fields.category || 'others';
        }else{
            Object.assign(this, defaultBlogPost);
        }
    }
}

module.exports = BlogPost;