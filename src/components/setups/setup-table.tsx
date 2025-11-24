'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'

export function SetupTable({columns, data}: {columns: string[]; data: Record<string, string>[]}) {
  return (
    <div className="border rounded-md overflow-x-auto">
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((col) => (
                        <TableHead key={col}>{col}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, i) => (
                    <TableRow key={i}>
                      {columns.map((col)=> (
                        <TableCell key={col}>{row[col]}</TableCell>
                      ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  );
}