# Version Update 1.0.1-beta
melakukan perbaikan endpoint analisa sentiment, menambah validasi pada input, menerapkan sistem anti XSS dan SQLi clear query.

## Tag Feature on Sentiment (Update path 1)
Tag digunakan untuk melakukan klasifikasi sentiment agar data sentiment lebih terorganisir, 1 sentiment bisa memiliki banyak tags.

### Creating Tags
```
POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/tags
```

body request 
```
{
  tag_name: string 
}
```

### Menampilkan seluruh Tags
```
GET https://sentivuebe1-6dh6x3vy.b4a.run/dev/tags
```

### Menampilkan spesifik tags
akan menampilkan data sentiment berdasarkan tags, pastikan terdapat data sentiment yang menggunakang tags ini.
```
GET https://sentivuebe1-6dh6x3vy.b4a.run/dev/:tag_id
```

### Mengubah Nama Tags
```
PUT https://sentivuebe1-6dh6x3vy.b4a.run/dev/tags/:tag_id
```

Body request
```
{
  tag_name: string
}
```

### Menghapus Tags
```
DELETE https://sentivuebe1-6dh6x3vy.b4a.run/dev/:tag_id
```

# Menghubungkan Tag dengan Data Sentiment!
Ketika akan membuat sentiment kita bisa menambahkan Tags atau tidak sama sekali, gunakan endpoint ini untuk membuat sentiment baru

```
POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment
```

body request :
```
{
  link: string | [string, string],
  platformName: string,
  resultLimit: 15,
  tags: ["Technology"] // Pastikan menggunakan Array
}
```

Kamu bisa menambahkan beberapa tags sekaligus pada body request dengan menggunakan tipe data array/list!
```
tags: ["Technology", "Science", "Software"]
```
