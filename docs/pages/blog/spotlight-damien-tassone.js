import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'blog/spotlight-damien-tassone';
const requireRaw = require.context('!raw-loader!./', false, /spotlight-damien-tassone\.md$/);

export default function Page({ docs }) {
  return <TopLayoutBlog docs={docs} />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
