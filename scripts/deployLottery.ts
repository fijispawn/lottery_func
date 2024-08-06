import { toNano, beginCell } from '@ton/core';
import { Lottery } from '../wrappers/Lottery';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const config = {
        initialAmount: BigInt(0), // Начальная сумма
        initialParticipants: beginCell().endCell() // Пустой список участников
    };

    const lottery = provider.open(Lottery.createFromConfig(config, await compile('Lottery')));

    await lottery.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(lottery.address);
}
