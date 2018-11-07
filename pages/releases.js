import React from 'react';
import Link from 'next/link';
import 'isomorphic-unfetch';

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
        <div className="hero">
          <h1 className="title">{title}</h1>
          <div className="notes">
            <p className="description">{notes}</p>
          </div>
          <p className="description">
            <a href={uri} target="_blnak">
              check this music at Discogs
            </a>
          </p>
          <p className="description">
            Get release data using{' '}
            <a href="http://www.discogs.com/developers/" target="_blnak">
              Discogs.com API v2.0.
            </a>
          </p>

          <div className="row">
            <div className="card">
              <h3>Artist</h3>
              {artists.map((artist, index) => (
                <div className="subcard">
                  <a href={artist.resource_url} key={index}>
                    <h3>{artist.name}</h3>
                  </a>
                  <p className="description">{artist.detail.profile}</p>
                  {artist.detail.urls.map(url => (
                    <p>
                      <a href={url}>{url}</a>
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <div className="card">
              <h3>Extra Aritists</h3>
              {extraartists.map((ext, index) => (
                <div className="subcard">
                  <a href={ext.resource_url} key={index}>
                    <h3>{ext.name}</h3>
                    <p>{ext.role}</p>
                  </a>
                </div>
              ))}
            </div>
            <div className="card">
              <h3>Company</h3>
              {companies.map((company, index) => (
                <div className="subcard">
                  <a href={company.resource_url} key={index}>
                    <h3>{company.name}</h3>
                    <p>{company.entity_type_name}</p>
                  </a>
                </div>
              ))}
            </div>
            <div className="card">
              <h3>Label</h3>
              {labels.map((label, index) => (
                <div className="subcard">
                  <a href={label.resource_url} key={index}>
                    <h3>{label.name}</h3>
                    <p>{label.catno}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
            text-align: center;
          }
          .title,
          .description {
            text-align: center;
          }
          .row {
            margin: 80px auto 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .notes {
            padding: 16px;
            margin: 16px auto;
            max-width: 520px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }
          .card {
            padding: 16px;
            width: 320px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }
          .subcard {
            margin: 16px;
            padding: 16px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }
          .card:hover {
            border-color: #067df7;
          }
          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
        `}</style>
      </div>
    );
  }
}
