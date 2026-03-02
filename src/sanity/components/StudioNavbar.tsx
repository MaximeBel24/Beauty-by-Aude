import {NavbarProps} from 'sanity'
import {Stack, Card, Flex} from '@sanity/ui'
import Link from "next/link";

export default function StudioNavbar(props: NavbarProps) {
    return (
        <Stack>
            <Card padding={2} className={"bg-[#FFFBF6]"}>
                <Flex align="center" justify="flex-end" paddingRight={3}>
                    <Link
                        href="/"
                        style={{
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontFamily: 'Jost, sans-serif',
                        }}
                        className={"text-burgundy"}
                    >
                        ← Retourner sur le site
                    </Link>
                </Flex>
            </Card>
            {props.renderDefault({...props, actions: []})}
        </Stack>
    )
}