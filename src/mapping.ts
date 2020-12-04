import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Axie,
  AxieSpawned,
  AxieEvolved,
  Transfer
} from "../generated/Axie/Axie"
import { LovelyAxie, TransferEntity } from "../generated/schema"

export function handleAxieSpawned(event: AxieSpawned): void {
 
  let lovelyAxie = LovelyAxie.load(event.params._axieId.toHex())
  if (lovelyAxie == null) {
    lovelyAxie = new LovelyAxie(event.params._axieId.toHex())
  }
  lovelyAxie.name = event.params._axieId
  lovelyAxie.genes = event.params._genes
  lovelyAxie.creator = event.params._owner
  lovelyAxie.birthTime = event.block.timestamp
  let contract = Axie.bind(event.address)
  lovelyAxie.axieURI = contract.tokenURI(event.params._axieId)
  lovelyAxie.save()
}
    
export function handleAxieEvolved(event: AxieEvolved): void {}

export function handleTransfer(event: Transfer): void {
  let transer = new TransferEntity (event.transaction.hash.toHex())
  transer.blockNumber = event.block.number
  transer.timestamp = event.block.timestamp
  transer.AxieNumber = event.params._tokenId
  transer.addressFrom = event.params._from
  transer.addressTo = event.params._to
  transer.save()
}

