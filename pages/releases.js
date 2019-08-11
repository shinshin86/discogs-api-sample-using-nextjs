import React from 'react';
import Link from 'next/link';
import 'isomorphic-unfetch';
import styled from 'styled-components';

const Hero = styled.div`
  width: 100%;
  color: #333;
`;

const Title = styled.h1`
  margin: 0;
  width: 100%;
  padding-top: 80px;
  line-height: 1.15;
  font-size: 48px;
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
`;

const Row = styled.div`
  margin: 80px auto 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Notes = styled.div`
  padding: 16px;
  margin: 16px auto;
  max-width: 520px;
  text-align: left;
  text-decoration: none;
  color: #434343;
  border: 1px solid #9b9b9b;
`;

const Card = styled.div`
  padding: 16px;
  width: 320px;
  text-align: left;
  text-decoration: none;
  color: #434343;
  border: 1px solid #9b9b9b;
  :hover {
    border-color: #067df7;
  }
`;

const Subcard = styled.div`
  margin: 16px;
  padding: 16px;
  text-align: left;
  text-decoration: none;
  color: #434343;
  border: 1px solid #9b9b9b;
`;

const ArtistName = styled.h3`
  margin: 0;
  color: #067df7;
  font-size: 18px;
`;

const ArtistDescription = styled.p`
  margin: 0;
  padding: 12px 0 0;
  font-size: 13px;
  color: #333;
`;

export default class Releases extends React.Component {
  static async getInitialProps({ query }) {
    const res = await fetch(`https://api.discogs.com/releases/${query.id}`);
    const release = await res.json();

    for (let i = 0; i < release.artists.length; i++) {
      const r = await fetch(release.artists[i].resource_url);
      release.artists[i].detail = await r.json();
    }

    return { release };
  }

  render() {
    const { release } = this.props;
    const {
      title,
      notes,
      artists,
      extraartists,
      companies,
      labels,
      uri
    } = release;

    return (
      <div>
        <Hero>
          <Title>{title}</Title>
          <Notes>
            <Description>{notes}</Description>
          </Notes>
          <Description>
            <a href={uri} target="_blnak">
              check this music at Discogs
            </a>
          </Description>
          <Description>
            Get release data using{' '}
            <a href="http://www.discogs.com/developers/" target="_blnak">
              Discogs.com API v2.0.
            </a>
          </Description>

          <Row>
            <Card>
              <ArtistName>Artist</ArtistName>
              {artists.map((artist, index) => (
                <Subcard>
                  <a href={artist.resource_url} key={index}>
                    <ArtistName>{artist.name}</ArtistName>
                  </a>
                  <ArtistDescription>{artist.detail.profile}</ArtistDescription>
                  {artist.detail.urls.map(url => (
                    <ArtistDescription>
                      <a href={url}>{url}</a>
                    </ArtistDescription>
                  ))}
                </Subcard>
              ))}
            </Card>
            <Card>
              <ArtistName>Extra Aritists</ArtistName>
              {extraartists.map((ext, index) => (
                <Subcard>
                  <a href={ext.resource_url} key={index}>
                    <ArtistName>{ext.name}</ArtistName>
                    <ArtistDescription>{ext.role}</ArtistDescription>
                  </a>
                </Subcard>
              ))}
            </Card>
            <Card>
              <ArtistName>Company</ArtistName>
              {companies.map((company, index) => (
                <Subcard>
                  <a href={company.resource_url} key={index}>
                    <ArtistName>{company.name}</ArtistName>
                    <ArtistDescription>
                      {company.entity_type_name}
                    </ArtistDescription>
                  </a>
                </Subcard>
              ))}
            </Card>
            <Card>
              <ArtistName>Label</ArtistName>
              {labels.map((label, index) => (
                <Subcard>
                  <a href={label.resource_url} key={index}>
                    <ArtistName>{label.name}</ArtistName>
                    <ArtistDescription>{label.catno}</ArtistDescription>
                  </a>
                </Subcard>
              ))}
            </Card>
          </Row>
        </Hero>
      </div>
    );
  }
}
