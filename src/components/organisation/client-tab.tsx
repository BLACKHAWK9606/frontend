'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SetupCard} from "@/components/setups/setup-card"

export function ClientTab() {
    return (
        <div className="space-y-6 pt-4">
            <SetupCard title="Client Types">
                <Input placeholder="Type Name (e.g. Individual, Corporate)"/>
                <Button>Save</Button>
            </SetupCard>

            <SetupCard title="Client Titles">
                <Input placeholder="Title (e.g. Mr, Mrs, Dr)"/>
                <Button>Save</Button>
            </SetupCard>

            <SetupCard title="Mobile Prefixes">
                <Input placeholder="Prefix(e.g. +254)"/>
                <Button>Save</Button>
            </SetupCard>
        </div>
    )
}