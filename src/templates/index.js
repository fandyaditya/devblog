import Helmet from 'react-helmet';
import React from 'react';

import userConfig from '../../config';

import Layout from './layout';
import Footer from '../components/Footer'

import Card from '../components/Card';
import Container from '../components/Container';
import Pagination from '../components/Pagination';
import Summary from '../components/Summary';
import Grid from '../components/Grid';
import WelcomePost from '../components/WelcomePost'

const IndexPage = ({ pageContext }) => {
  const { group, index, pageCount } = pageContext;
  const previousUrl = index - 1 === 1 ? '' : (index - 1).toString();
  const nextUrl = (index + 1).toString();
  return (
    <Layout showHeader={true}>
      <Container>
        <Helmet
          title={`${userConfig.title} | ${userConfig.author}`}
          htmlAttributes={{ lang: 'en' }}>
          <meta
            name="description"
            content={`${userConfig.title} | ${userConfig.description}`}/>
        </Helmet>
        <WelcomePost/>
        <Grid>
          {group.map(({ node }) => 
            {
              let result = null;
              if(node.fields.slug != "/about/") {
                result = (  
                  <Card key={node.fields.slug}>
                    <Summary
                      date={node.frontmatter.date}
                      title={node.frontmatter.title}
                      excerpt={node.excerpt}
                      image={node.frontmatter.featuredImage}
                      slug={node.fields.slug}
                    />
                  </Card>
                )
              }
              return result
            }
          )}
        </Grid>
        <Pagination
          isFirst={index === 1}
          isLast={index === pageCount}
          nextUrl={nextUrl}
          previousUrl={previousUrl}/>
        <Footer/>
      </Container>
    </Layout>
  );
};
export default IndexPage;