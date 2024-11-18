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
  case 'youtube':
    return comments.map((item) => ({
      uid: null,
      username: item.author,
      text: item.comment,
      likes: item.voteCount,
      createdAt: null,
      avatar: null
    }));
  case 'googlemaps':
    return comments.map((item) => ({
      uid: null,
      username: item.name,
      text: item.text,
      likes: item.stars,
      createdAt: null,
      avatar: null,
    }));
  }
};

export default filteredComment;
