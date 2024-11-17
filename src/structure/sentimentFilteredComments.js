const filteredComment = (actor, comments) => {
  switch (actor) {
  case 'instagram':
    return comments.map((item) => ({
      uid: item.id,
      username: item.ownerUsername,
      text: item.text,
      likes: item.likesCount,
      createdAt: item.timestamp,
      avatar: item.ownerProfilePicUrl
    }));
  case 'tiktok':
    return comments.map((item) => ({
      uid: item.uid,
      username: item.uniqueId,
      text: item.text,
      likes: item.diggCount,
      createdAt: item.createTimeISO,
      avatar: item.avatarThumbnail,
    }));
  }
};

export default filteredComment;
