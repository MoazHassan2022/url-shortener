import React, { useState } from "react";
import logo from "./logo.png";

import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  box-sizing: border-box;
  overflow: auto;
`;

const Logo = styled.img`
  width: 400px;
  height: 200px;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #555;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 2px solid #ccc;
  border-radius: 7px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0069d9;
  }
`;

const ShortLink = styled.div`
  margin-top: 1rem;
  text-align: center;

  a {
    color: #00d;
    text-decoration: none;
    font-weight: bold;
  }
`;

const Error = styled.p`
  color: red;
`;

const App = () => {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortLink, setShortLink] = useState("http://localhost:3000/nknced");
  const [error, setError] = useState("");
  const [iosPrimary, setIOSPrimary] = useState("");
  const [iosFallback, setIOSFallback] = useState("");
  const [androidPrimary, setAndroidPrimary] = useState("");
  const [androidFallback, setAndroidFallback] = useState("");

  return (
    <Wrapper>
      <Logo src={logo} alt="Logo" />
      <Title>Let's get your URL shortened!</Title>
      <Form>
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <Input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Custom Slug (Optional)"
        />
        <Input
          type="text"
          value={iosPrimary}
          onChange={(e) => setIOSPrimary(e.target.value)}
          placeholder="iOS Primary"
        />
        <Input
          type="text"
          value={iosFallback}
          onChange={(e) => setIOSFallback(e.target.value)}
          placeholder="iOS Fallback"
        />
        <Input
          type="text"
          value={androidPrimary}
          onChange={(e) => setAndroidPrimary(e.target.value)}
          placeholder="Android Primary"
        />
        <Input
          type="text"
          value={androidFallback}
          onChange={(e) => setAndroidFallback(e.target.value)}
          placeholder="Android Fallback"
        />
        <Button type="submit">Shorten</Button>
      </Form>
      {shortLink && (
        <ShortLink>
          <Title>Recent Short Link:</Title>
          <a href={shortLink} target="_blank" rel="noopener noreferrer">
            {shortLink}
          </a>
        </ShortLink>
      )}
      {error && <Error>{error}</Error>}
      <Title>Update your old shortened URL!</Title>
      <Form>
        <Input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Old Slug"
        />
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL (Optional)"
        />
        <Input
          type="text"
          value={iosPrimary}
          onChange={(e) => setIOSPrimary(e.target.value)}
          placeholder="iOS Primary (Optional)"
        />
        <Input
          type="text"
          value={iosFallback}
          onChange={(e) => setIOSFallback(e.target.value)}
          placeholder="iOS Fallback (Optional)"
        />
        <Input
          type="text"
          value={androidPrimary}
          onChange={(e) => setAndroidPrimary(e.target.value)}
          placeholder="Android Primary (Optional)"
        />
        <Input
          type="text"
          value={androidFallback}
          onChange={(e) => setAndroidFallback(e.target.value)}
          placeholder="Android Fallback (Optional)"
        />
        <Button type="submit">Update</Button>
      </Form>
      {shortLink && (
        <ShortLink>
          <Title>Recent Short Link:</Title>
          <a href={shortLink} target="_blank" rel="noopener noreferrer">
            {shortLink}
          </a>
        </ShortLink>
      )}
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
};

export default App;
