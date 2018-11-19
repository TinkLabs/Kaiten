export default function() {
	return new Promise((resolve, reject) => {
		resolve({
			restaurants: [
				{
					id: 1,
					name: '伊勢 すえよし',
					category: '広尾/懐石・会席料理',
					hotel_id: null,
					staff_like_count: 0,
					cover_image: 'https://tblg.k-img.com/restaurant/images/Rvw/57930/640x640_rect_57930027.jpg',
					images: ['https://tblg.k-img.com/restaurant/images/Rvw/57930/640x640_rect_57930027.jpg'],
					lat: 35.658665,
					lng: 139.723492,
					area: '六本木',
				},
				{
					id: 2,
					name: '臼杵ふぐ 山田屋 西麻布',
					category: '河豚料理',
					hotel_id: null,
					staff_like_count: 0,
					cover_image: 'https://tblg.k-img.com/restaurant/images/Rvw/95551/150x150_square_95551528.jpg',
					images: ['https://tblg.k-img.com/restaurant/images/Rvw/95551/150x150_square_95551528.jpg'],
					lat: 35.658203,
					lng: 139.722669,
					area: '六本木',
				},
				{
					id: 3,
					name: 'とく山',
					category: '広尾/懐石・会席料理',
					hotel_id: null,
					staff_like_count: 0,
					cover_image: 'https://tblg.k-img.com/restaurant/images/Rvw/45852/150x150_square_45852299.jpg',
					images: ['https://tblg.k-img.com/restaurant/images/Rvw/45852/150x150_square_45852299.jpg'],
					lat: 35.659342,
					lng: 139.722511,
					area: '六本木',
				},
			],
		});
	});
}