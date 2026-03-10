import {NavbarProps} from 'sanity'
import {Stack, Card, Flex} from '@sanity/ui'
import Link from "next/link";

export default function StudioNavbar(props: NavbarProps) {
    return (
        <Stack>
            {/* Card sans className → hérite du thème Sanity (dark/light automatique) */}
            <Card padding={2}>
                <Flex align="center" justify="flex-end" paddingRight={3}>
                    {/* Inline styles au lieu de classes Tailwind :
                        Tailwind fonctionne sur le site, pas dans le contexte Sanity Studio */}
                    <Link
                        href="/"
                        style={{
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontFamily: 'Jost, sans-serif',
                            color: '#FFEDDA',
                        }}
                    >
                        ← Retourner sur le site
                    </Link>
                </Flex>
            </Card>
            {props.renderDefault(props)}
        </Stack>
    )
}