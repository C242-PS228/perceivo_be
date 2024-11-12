CREATE DATABASE sentivue_db;
USE sentivue_db;
-- Tabel tb_users
CREATE TABLE tb_users (
    user_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
-- Tabel tb_platforms
CREATE TABLE tb_platforms (
    platform_id INT PRIMARY KEY,
    platform_name VARCHAR(255) NOT NULL,
    actor_id INT
);
-- Tabel tb_sentiment_detail
CREATE TABLE tb_sentiment_detail (
    sentiment_detail_id INT PRIMARY KEY,
    postId VARCHAR(255),
    postUrl VARCHAR(255),
    ownerUsername VARCHAR(255),
    ownerProfilePicture VARCHAR(255)
);
-- Tabel tb_sentiments
CREATE TABLE tb_sentiments (
    id INT PRIMARY KEY,
    user_id INT,
    platform_id INT,
    sentiment_detail_id INT,
    FOREIGN KEY (user_id) REFERENCES tb_users(user_id),
    FOREIGN KEY (platform_id) REFERENCES tb_platforms(platform_id),
    FOREIGN KEY (sentiment_detail_id) REFERENCES tb_sentiment_detail(sentiment_detail_id)
);
-- Tabel tb_comments
CREATE TABLE tb_comments (
    comment_id INT PRIMARY KEY,
    sentiment_id INT,
    platform VARCHAR(255),
    text TEXT,
    FOREIGN KEY (sentiment_id) REFERENCES tb_sentiments(id)
);
-- Tabel tb_resums
CREATE TABLE tb_resums (
    resum_id INT PRIMARY KEY,
    sentiment_id INT,
    status VARCHAR(50),
    description TEXT,
    FOREIGN KEY (sentiment_id) REFERENCES tb_sentiments(id)
);
