import React from "react";
import { Helmet } from "react-helmet";

function SEO({ title, description, image, url }) {
  return (
    <Helmet>
      <title>{title + " - dmchoi blog"}</title>

      <meta property="og:type" content={"website"} data-react-helmet="true" />
      <meta property="og:title" content={title} data-react-helmet="true" />
      <meta
        property="og:description"
        content={description}
        data-react-helmet="true"
      />
      <meta
        property="og:image"
        content={image ?? null}
        data-react-helmet="true"
      />
      <meta
        property="og:url"
        content={url ? `http://15.164.220.78/${url}` : "http://15.164.220.78"}
        data-react-helmet="true"
      />
    </Helmet>
  );
}

export default SEO;
