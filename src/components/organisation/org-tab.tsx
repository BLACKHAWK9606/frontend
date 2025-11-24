'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SetupCard} from "@/components/setups/setup-card";

export function OrganizationTab() {
    return (
        <div className="space-y-6 pt-4">
            <SetupCard title="Currency Definition">
                <Input placeholder="Currency Name (e.g. Kenya Shillings)"/>
                <Input placeholder="Currency Code (e.g. KES)"/>
                <Button>Save</Button>
            </SetupCard>

            <SetupCard title="Payment Modes">
                <Input placeholder="Mode Name (e.g. M-Pesa)"/>
                <Input placeholder="Description"/>
                <Button>Save</Button>
            </SetupCard>
        </div>
    )
}