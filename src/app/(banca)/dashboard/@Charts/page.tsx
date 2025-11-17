'use client';
import { useEffect, useState } from 'react';
import {Table, TableHeader, TableHead, TableBody, TableRow, TableCell} from '@/components/ui/table';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

import Image from 'next/image';

export default function ChartSection() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch insurance products
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products.slice(0, 4))); // Limit to 4 items

    // Fetch user engagement data
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(data => setUsers(data.users.slice(0, 6))); // Limit to 6 users
  }, []);

  return (
    <section className="space-y-10">
      <div >
        <h3 className="text-lg font-semibold mb-2">Insurance Products Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product: any) => (
           <Card key={product.id} className="bg-blue-50 text-black shadow-md">
              <CardHeader>
                <CardTitle> {product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image src={product.thumbnail} alt={product.title} width={100} height={100} className="rounded mb-2"/>
              </CardContent>
           </Card> 
          ))}
        </div>
      </div>
      <div >
        <h3 className="text-lg font-semibold mb-2">User Profile</h3>
        <Table className="bg-white rounded shadow-md">
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
           <TableRow key={user.id}>
              <TableCell>
                <Image src={user.image} alt={user.firstName} width={40} height={40} className="rounded-full"/>
              </TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.company?.title}</TableCell>              
           </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

