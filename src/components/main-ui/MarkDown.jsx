import React from 'react';
import Markdown from 'markdown-to-jsx';

const MarkdownRenderer = ({ markdownText }) => {
    return (
        <div style={{ width: '100%', margin: '10px 0' }}>
            <Markdown
                options={{
                    overrides: {
                        table: {
                            props: {
                                style: { width: '100%', borderCollapse: 'collapse', borderRadius: '10px', margin: '10px 0' }
                            }
                        },
                        th: {
                            props: {
                              className: "text-lg font-semibold my-4",

                                style: { border: '1px solid #ddd', padding: '8px'}
                            }
                        },
                        td: {
                            props: {
                                style: { border: '1px solid #ddd', padding: '8px' }
                            }
                        },
                        h1: {
                          props: {
                            className: "text-2xl my-4",
                            style: { fontWeight: 700 },
                          },
                        },
                        h2: {
                          props: {
                            className: "text-2xl my-4",
                            style: { fontWeight: 650 },
                          },
                        },
                        h3: {
                          props: {
                            className: "text-xl my-4",
                            style: { fontWeight: 600 },
                          },
                        },
                        strong: {
                          props: {
                            className: "text-lg",
                            style: { fontWeight: 600 },
                          }, // light bold for **
                        },
                        ul: {
                          props: {
                            className: "list-disc ml-6 my-2",
                          },
                        },
                        li: {
                          props: { className: "mb-1" },
                        },
                    }
                }}
            >
                {markdownText}
            </Markdown>
        </div>
    );
};

export default MarkdownRenderer;