import {graphql} from 'gatsby';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import React from 'react';

import userConfig from '../../config';

import Layout from './layout';

import Article from '../components/Article';
import ArticleHeader from '../components/ArticleHeader';
import Button from '../components/Button';
import Container from '../components/Container';
import FeaturedImage from '../components/FeaturedImage';
import PageNav from '../components/PageNav';
import Share from '../components/Share';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const author = get(this.props, 'data.site.siteMetadata.author');
    const { previous, next } = this.props.pageContext;
    let disqusConfig = {
      identifier: post.id,
      title: post.frontmatter.title,
    }

    let url = '';
    if (typeof window !== `undefined`) {
      url = window.location.href;
    }

    return (
      <Layout showHeader={ false }>

        <Container>

          <Helmet
            title={`${post.frontmatter.title} | ${author}`}
            htmlAttributes={{ lang: 'en' }}>
            <meta
              name="description"
              content={`${userConfig.title} | ${userConfig.description}`}
            />

          </Helmet>
        
            <ArticleHeader>

              {post.frontmatter.featuredImage && (
                <FeaturedImage
                  sizes={post.frontmatter.featuredImage.childImageSharp.sizes}
                />
              )}

              <h1>{post.frontmatter.title}</h1>
              <p>{post.frontmatter.date}</p>
              <span />

            </ArticleHeader>

            <Article>

              {/* <CommentCount config={disqusConfig} placeholder={'...'} /> */}
              <div dangerouslySetInnerHTML={{ __html: post.html }} />

            </Article>

            {userConfig.showShareButtons && (
              <Share url={url} title={post.frontmatter.title} />
            )}
         

          <PageNav>
            {previous && (
              <Button to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Button>
            )}

            {next && (
              <Button to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Button>
            )}
          </PageNav>
          
            <Disqus style={{marginLeft: 50, marginRight: 50, marginTop: 25}} config={disqusConfig} />

        </Container>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featuredImage {
          childImageSharp {
            sizes(maxWidth: 850) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
