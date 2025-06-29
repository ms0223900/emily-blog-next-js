import { cn } from "@/styles/helpers"
import React from "react"

const RwdComponent = ({
    mobileClassName,
    desktopClassName,
    mobileComponent,
    desktopComponent,
}: {
    mobileComponent: React.ReactNode
    mobileClassName?: string
    desktopComponent: React.ReactNode
    desktopClassName?: string
}) => {
    return <React.Fragment>
        <div className={cn(`md:hidden w-full`, mobileClassName)}>
            {mobileComponent}
        </div>
        <div className={cn(`hidden md:block`, desktopClassName)}>
            {desktopComponent}
        </div>
    </React.Fragment>
}

export default RwdComponent
