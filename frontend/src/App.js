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

const Table = styled.table`
  width: 100%;
  margin-top: 2rem;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

const TableHeader = styled.th`
  padding: 1rem;
  font-weight: bold;
  text-align: left;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    overflow: visible;
    white-space: normal;
    max-width: none;
  }
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
  const [urlUpdate, setUrlUpdate] = useState("");
  const [slugUpdate, setSlugUpdate] = useState("");
  const [errorUpdate, setErrorUpdate] = useState("");
  const [iosPrimaryUpdate, setIOSPrimaryUpdate] = useState("");
  const [iosFallbackUpdate, setIOSFallbackUpdate] = useState("");
  const [androidPrimaryUpdate, setAndroidPrimaryUpdate] = useState("");
  const [androidFallbackUpdate, setAndroidFallbackUpdate] = useState("");
  const [errorShow, setErrorShow] = useState("");
  const [shortLinks, setShortLinks] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const fetchShortLinks = async () => {
    try {
      const response = await fetch("/shortlinks");
      const data = await response.json();
      /*const data = [  {
          slug: "cedcedced5",
          web: "https://google.com",
          ios: {
            primary: "https://apps.apple.com/us/app/instagram/id389801252",
            fallback: "https://apps.apple.com/us/app/instagram/id389801252",
          },
          android: {
            primary: "https://apps.store.com/us/app/instagram/id389801252",
            fallback: "https://apps.store.com/us/app/instagram/id389801252",
          },
        },
      ];*/
      setShortLinks(data);
      setShowTable(true);
    } catch (error) {
      console.error(error);
      setErrorShow("Server error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/shortlinks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          ios: {
            primary: iosPrimary,
            fallback: iosFallback,
          },
          android: {
            primary: androidPrimary,
            fallback: androidFallback,
          },
          web: url,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortLink(`http://localhost:3000/${slug}`);
        setError("");
      } else {
        const error = await response.json();
        setShortLink("");
        setError(error.error);
      }
    } catch (error) {
      console.error(error);
      setShortLink("");
      setError("Server error");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/shortlinks/${slugUpdate}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ios: {
            primary: iosPrimaryUpdate,
            fallback: iosFallbackUpdate,
          },
          android: {
            primary: androidPrimaryUpdate,
            fallback: androidFallbackUpdate,
          },
          web: urlUpdate, // Assuming updateUrl is the new URL input for web
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortLink(`http://localhost:3000/${slugUpdate}`);
        setError("");
      } else {
        const error = await response.json();
        setShortLink("");
        setErrorUpdate(error.error);
      }
    } catch (error) {
      console.error(error);
      setShortLink("");
      setErrorUpdate("Server error");
    }
  };

  return (
    <Wrapper>
      <Logo src={logo} alt="Logo" />
      <Title>Let's get your URL shortened!</Title>
      <Form onSubmit={handleSubmit}>
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
      <Form onSubmit={handleUpdate}>
        <Input
          type="text"
          value={slugUpdate}
          onChange={(e) => setSlugUpdate(e.target.value)}
          placeholder="Old Slug"
        />
        <Input
          type="text"
          value={urlUpdate}
          onChange={(e) => setUrlUpdate(e.target.value)}
          placeholder="Enter URL (Optional)"
        />
        <Input
          type="text"
          value={iosPrimaryUpdate}
          onChange={(e) => setIOSPrimaryUpdate(e.target.value)}
          placeholder="iOS Primary (Optional)"
        />
        <Input
          type="text"
          value={iosFallbackUpdate}
          onChange={(e) => setIOSFallbackUpdate(e.target.value)}
          placeholder="iOS Fallback (Optional)"
        />
        <Input
          type="text"
          value={androidPrimaryUpdate}
          onChange={(e) => setAndroidPrimaryUpdate(e.target.value)}
          placeholder="Android Primary (Optional)"
        />
        <Input
          type="text"
          value={androidFallbackUpdate}
          onChange={(e) => setAndroidFallbackUpdate(e.target.value)}
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
      {errorUpdate && <Error>{errorUpdate}</Error>}
      <br></br>
      <br></br>
      <br></br>
      <Button onClick={fetchShortLinks}>Show Short Links</Button>
      {errorShow && <Error>{errorShow}</Error>}
      {showTable && (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Slug</TableHeader>
              <TableHeader>Web</TableHeader>
              <TableHeader>IOS Primary</TableHeader>
              <TableHeader>IOS Fallback</TableHeader>
              <TableHeader>Android Primary</TableHeader>
              <TableHeader>Android Fallback</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {shortLinks.map((link) => (
              <TableRow key={link.slug}>
                <TableCell>{link.slug}</TableCell>
                <TableCell>{link.web}</TableCell>
                <TableCell>{link.ios.primary}</TableCell>
                <TableCell>{link.ios.fallback}</TableCell>
                <TableCell>{link.android.primary}</TableCell>
                <TableCell>{link.android.fallback}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Wrapper>
  );
};

export default App;
