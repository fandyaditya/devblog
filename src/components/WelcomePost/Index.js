import ArticleHeader from '../ArticleHeader'
import FeaturedImage from '../FeaturedImage'
import Article from '../Article'
import { StaticQuery, graphql} from 'gatsby';
import React from 'react';

const query = graphql`
  query BlogPostBySlug {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: {eq: "/about/"} }) {
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
  `

export default () => {
  return (
    <StaticQuery
      query = { query }
      render={data => {
        const post = data.markdownRemark;
        return (
          <div>
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
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </Article>
          </div>
        )
      }}
    />
  );
};