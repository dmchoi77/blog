import React from 'react'
import { Helmet } from 'react-helmet'

function SEO(props) {


    return (
        <Helmet>
            <title>{props.title + " - dmchoi blog"}</ title >

            <meta property="og:type" content={"website"} data-react-helmet="true" />
            <meta property="og:title" content={props.title} data-react-helmet="true" />
            <meta property="og:description" content={props.description} data-react-helmet="true" />
            <meta property="og:image" content={props.image ?? null} data-react-helmet="true" />
            <meta property="og:url" content={props.url ? `http://15.164.220.78/${props.url}` : "http://15.164.220.78"} data-react-helmet="true" />
        </Helmet >

    )
}

export default SEO
