const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dateConverter = (dateNum: number) =>{
    const date = new Date(dateNum);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate()
    const year = date.getFullYear()
    return `${day} ${month} ${year}`;
}

export default dateConverter;
