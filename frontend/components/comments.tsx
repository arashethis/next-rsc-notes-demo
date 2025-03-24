"use client";

import {use} from 'react';

export default function Comments({commentsPromise}) {
  // 注意: 这样做会复用服务器上的 promise
  // 它会一直等到数据可用之后才继续
  const comments = use<string[]>(commentsPromise);
  return comments.map(comment => <p>{comment}</p>);
}