import ArticleHeader from '../ArticleHeader'
import FeaturedImage from '../FeaturedImage'
import Article from '../Article'
import Wrapper from './Wrapper'
import { useStaticQuery, graphql} from 'gatsby';
import React from 'react';

function WelcomePost() {
  const data = useStaticQuery(graphql`
    query GetAbout {
      site {
        siteMetadata {
          title
          author
        }
      }
      markdownRemark(fields: { slug: { eq: "/about/" } }) {
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
  `)
  const post = data.markdownRemark;

  return (
    <Wrapper>
      <ArticleHeader>
        {post.frontmatter.featuredImage && (
          <FeaturedImage
            sizes={post.frontmatter.featuredImage.childImageSharp.sizes}
          />
        )}
        <h1>{post.frontmatter.title}</h1>
        <p>{post.frontmatter.date}</p>
      </ArticleHeader>
      <Article>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Article>
      <span />
    </Wrapper>
  )
};

export default WelcomePost;
