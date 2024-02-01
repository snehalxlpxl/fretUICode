export class packages{
  
        cargoPackId: number;
        cargoId: number;
        cargoPackTypeId: number;
        containerId: number;
        cargoPackName: string;
        packageCount: number;
        length: number;
        width: number;
        height: number;
        sizeId: number;
        netWeight: number;
        grossWeight: number;
        weightUnitId: number;
        volume: number;
        volumeUnitId: number;
        packageDescription: string;
        marksAndNumbers: string;
        invoiceNumber: string;
        invoiceDate: string;
        sbno: string;
        sbdate: string;
        isPerPackage: boolean;
        weightKgs: number;
        weightLbs: number;
        volumeCbm: number;
        volumeFt3: number;
        volumeWeight: number;
        totalNetWeight: number;
        totalGrossWeight: number;
        totalVolume: number;
        totalVolumeWeight: number;
        parentPackageId: number;
        createdBy: number;
        dateCreated: string;
        modifiedBy: number;
        dateModified: string;
        deletedBy: number;
        dateDeleted: string;
        isDeleted: boolean;
        cargo: {
          cargoId: number;
          cargoNumber: string;
          jobNo: string;
          masterNo: string;
          houseNo: string;
          modeOfTransport: string;
          transportDirection: string;
          isConsolidation: boolean;
          incoTermId: number;
          typeOfMoveId: number;
          pickupAddressId: number;
          deliveryAddressId: number;
          opportunityId: number;
          customerReference: string;
          polid: number;
          pol: string;
          podid: number;
          pod: string;
          etd: string;
          eta: string;
          shipperId: number;
          shipperAddressId: number;
          shipper: string;
          consigneeId: number;
          consigneeAddressId: number;
          consignee: string;
          notifyParty1Id: number;
          notifyParty1AddressId: number;
          notifyParty1: string;
          notifyParty2Id: number;
          notifyParty2AddressId: number;
          forwarderId: number;
          forwardedAddressId: number;
          originAgentId: number;
          originAgentAddressId: number;
          destinationAgentId: number;
          destinationAgentAddressId: number;
          notes: string;
          createdBy: number;
          dateCreated: string;
          modifiedBy: number;
          dateModified: string;
          deletedBy: number;
          dateDeleted: string;
          isDeleted: boolean;
          customerId: number;
          cargoApprovalStatus: string;
          cargoSopapprovalStatus: string;
          officeId: number;
          freightStatus: string;
          paymentTerms: string;
          invoicingParty: string;
          jobType: number;
          isHblnoautogenerate: boolean;
          salesQuoteId: number;
          isLocked: boolean;
          lockedBy: number;
          lockedDate: string;
          hblTerm: string;
          mblTerm: string;
          hblStatus: string;
          mblStatus: string;
          freeDays: string;
          por: string;
          isGstJob: boolean
        };
        cargoPackType: {
          packageTypeId: number;
          packageGroupId: number;
          packageTypeName: string;
          packageTypeShortName: string;
          packageCode: string;
          isContainer: boolean;
          containerIsocode: string;
          defaultLength: number;
          defaultWidth: number;
          defaultHeight: number;
          dimensionsUnitId: number;
          weight: number;
          maxWeight: number;
          weightUnitId: number;
          isOcean: boolean;
          isAir: boolean;
          isSurface: boolean;
          isActive: boolean;
          createdBy: number;
          dateCreated: string;
          modifiedBy: number;
          dateModified: string;
          deletedBy: number;
          dateDeleted: string;
          isDeleted: boolean;
          packageGroup: {
            packageGroupId: number;
            packageGroupName: string;
            isActive: boolean
          }
        };
        container: {
          containerId: number;
          containerTypeId: number;
          cargoId: number;
          containerCode: string;
          containerNumber: string;
          seal1: string;
          seal2: string;
          description: string;
          createdBy: number;
          dateCreated: string;
          modifiedBy: number;
          dateModified: string;
          deletedBy: number;
          dateDeleted: string;
          isDeleted: boolean;
          vgmweight: number;
          cargo: string;
          containerType: string
        }
    
}