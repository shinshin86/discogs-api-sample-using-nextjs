import React from 'react';
import Link from 'next/link';

const Home = () => (
  <div>
    <div className="title">Discogs API Sample</div>
    <div className="row">
      <form action="/releases">
        <label>
          Release ID:
          <input type="text" name="id" />
        </label>
        <div className="button">
          <input type="submit" value="Search" />
        </div>
      </form>
    </div>

    <style jsx>{`
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .button {
        text-align: center;
      }
      input[type='submit'] {
        background-color: #4385cc;
        color: white;
        padding: 16px 32px;
        border-radius: 8px;
        text-decoration: none;
        margin: 4px 2px;
        cursor: pointer;
      }
    `}</style>
  </div>
);

export default Home;
